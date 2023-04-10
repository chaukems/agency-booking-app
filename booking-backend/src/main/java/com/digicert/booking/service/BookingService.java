package com.digicert.booking.service;

import com.digicert.booking.entity.Booking;

import java.util.List;

public interface BookingService {
    Booking save(Booking booking);

    Booking update(Booking booking);

    List<Booking> findAll();

    void delete(Booking booking);

    Booking getBooking(long id) throws Exception;

}
