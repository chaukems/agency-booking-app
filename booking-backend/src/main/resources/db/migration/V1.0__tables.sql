create TABLE bookings
(
    ID            BIGINT PRIMARY KEY auto_increment NOT NULL,
    start_Date     VARCHAR(15),
    end_Date      VARCHAR(15),
    room_Type      VARCHAR(50),
    requirements VARCHAR(250),
    adults BIGINT,
    children          BIGINT,
    nights    BIGINT,
    requests  VARCHAR(250),
    entry_Date      VARCHAR(10),
    status    VARCHAR(20)
);