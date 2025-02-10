CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courts (
    court_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE time_slots (
    slot_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    court_id CHAR(36) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    weekday_price DECIMAL(10,2) NOT NULL,  
    weekend_price DECIMAL(10,2) NOT NULL,  
    FOREIGN KEY (court_id) REFERENCES courts(court_id) ON DELETE CASCADE
);

CREATE TABLE bookings (
    booking_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    court_id CHAR(36) NOT NULL,
    slot_id CHAR(36) NOT NULL,
    booking_date DATE NOT NULL,
    final_price DECIMAL(10,2) NOT NULL,  
    status ENUM('booked', 'cancelled', 'completed') DEFAULT 'booked',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (court_id) REFERENCES courts(court_id) ON DELETE CASCADE,
    FOREIGN KEY (slot_id) REFERENCES time_slots(slot_id) ON DELETE CASCADE
);

CREATE TABLE admin_logs (
    log_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    admin_id CHAR(36) NOT NULL,
    action TEXT NOT NULL,
    action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE payments (
    payment_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    booking_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_mode ENUM('online', 'offline') NOT NULL, -- Online via payment gateway or Offline at court
    transaction_id VARCHAR(100) NULL, -- Only used for online payments
    admin_id CHAR(36) NULL, -- Only used for offline payments
    payment_status ENUM('successful', 'pending', 'failed', 'refunded') DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE SET NULL
);

/*
INSERT INTO users (user_id, name, email, password_hash, role) VALUES
(UUID(), 'John Doe', 'john@example.com', 'hashed_password_1', 'user'),
(UUID(), 'Jane Smith', 'jane@example.com', 'hashed_password_2', 'admin'),
(UUID(), 'Mike Johnson', 'mike@example.com', 'hashed_password_3', 'user');

INSERT INTO courts (court_id, name, location) VALUES
(UUID(), 'Court 1', 'Downtown Sports Complex'),
(UUID(), 'Court 2', 'Westside Recreation Center'),
(UUID(), 'Court 3', 'East Park Sports Arena');


INSERT INTO time_slots (slot_id, court_id, start_time, end_time, weekday_price, weekend_price)
SELECT UUID(), c.court_id, t.start_time, t.end_time, 800, 1000
FROM courts c
CROSS JOIN (
    SELECT '06:00:00' AS start_time, '07:00:00' AS end_time UNION ALL
    SELECT '07:00:00', '08:00:00' UNION ALL
    SELECT '08:00:00', '09:00:00' UNION ALL
    SELECT '09:00:00', '10:00:00' UNION ALL
    SELECT '10:00:00', '11:00:00' UNION ALL
    SELECT '11:00:00', '12:00:00' UNION ALL
    SELECT '12:00:00', '13:00:00' UNION ALL
    SELECT '13:00:00', '14:00:00' UNION ALL
    SELECT '14:00:00', '15:00:00' UNION ALL
    SELECT '15:00:00', '16:00:00' UNION ALL
    SELECT '16:00:00', '17:00:00' UNION ALL
    SELECT '17:00:00', '18:00:00' UNION ALL
    SELECT '18:00:00', '19:00:00' UNION ALL
    SELECT '19:00:00', '20:00:00' UNION ALL
    SELECT '20:00:00', '21:00:00' UNION ALL
    SELECT '21:00:00', '22:00:00' UNION ALL
    SELECT '22:00:00', '23:00:00'
) t;

INSERT INTO bookings (booking_id, user_id, court_id, slot_id, booking_date, final_price, status) VALUES
(UUID(), 
 (SELECT user_id FROM users WHERE email = 'john@example.com'),
 (SELECT court_id FROM courts WHERE name = 'Court 1'),
 (SELECT slot_id FROM time_slots WHERE start_time = '08:00:00' AND court_id = (SELECT court_id FROM courts WHERE name = 'Court 1')),
 '2025-02-08', -- Saturday (weekend pricing applies)
 30.00, 
 'booked'),

(UUID(), 
 (SELECT user_id FROM users WHERE email = 'mike@example.com'),
 (SELECT court_id FROM courts WHERE name = 'Court 2'),
 (SELECT slot_id FROM time_slots WHERE start_time = '14:00:00' AND court_id = (SELECT court_id FROM courts WHERE name = 'Court 2')),
 '2025-02-12', -- Wednesday (weekday pricing applies)
 18.00, 
 'booked');
 
 
 INSERT INTO admin_logs (log_id, admin_id, action) VALUES
(UUID(), 
 (SELECT user_id FROM users WHERE email = 'jane@example.com'),
 'Updated weekend price for Court 1 time slot 08:00-10:00 to $30.00'),

(UUID(), 
 (SELECT user_id FROM users WHERE email = 'jane@example.com'),
 'Cancelled booking for user John Doe on Court 1');

 
 INSERT INTO payments (payment_id, booking_id, user_id, amount, payment_mode, transaction_id, payment_status) VALUES
(UUID(), 
 (SELECT booking_id FROM bookings WHERE user_id = (SELECT user_id FROM users WHERE email = 'john@example.com')), 
 (SELECT user_id FROM users WHERE email = 'john@example.com'),
 1000.00, 
 'online', 
 'TXN1234567890', 
 'successful');
 
 INSERT INTO payments (payment_id, booking_id, user_id, amount, payment_mode, admin_id, payment_status) VALUES
(UUID(), 
 (SELECT booking_id FROM bookings WHERE user_id = (SELECT user_id FROM users WHERE email = 'mike@example.com')), 
 (SELECT user_id FROM users WHERE email = 'mike@example.com'),
 800.00, 
 'offline', 
 (SELECT user_id FROM users WHERE email = 'jane@example.com'), -- Admin handling the payment
 'successful');
 */

/* queries for fetching the available slots   */

SELECT ts.slot_id, c.court_id, c.name AS court_name, ts.start_time, ts.end_time, 
       CASE 
           WHEN DAYOFWEEK('2025-02-10') IN (1, 7) THEN ts.weekend_price  -- Weekend pricing (Saturday/Sunday)
           ELSE ts.weekday_price 
       END AS price
FROM time_slots ts
JOIN courts c ON ts.court_id = c.court_id
WHERE NOT EXISTS (
    SELECT 1 FROM bookings b 
    WHERE b.slot_id = ts.slot_id 
    AND b.booking_date = '2025-02-11' 
    AND b.status = 'booked'
)
ORDER BY c.name, ts.start_time;






