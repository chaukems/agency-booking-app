package com.digicert.booking;


import com.digicert.booking.entity.Booking;
import com.digicert.booking.service.BookingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class BookingAppTest {

    @Autowired
    private BookingService bookingService;

    @Test
    public void createBooking() throws Exception {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Booking booking = new Booking();
        booking.setStatus("Pending");
        booking.setEntryDate(format.format(new Date()));
        booking.setStartDate("2023-04-15");
        booking.setEndDate("2023-04-17");
        booking.setRequests("N/A");
        booking.setRequirements("N/A");
        booking.setRoomType("Standard");
        booking.setAdults(2);
        booking.setNights(2);
        booking.setChildren(0);

        Booking savedBooking = bookingService.save(booking);
        assertThat(savedBooking.getStartDate()).isEqualTo("2023-04-15");
    }

    @Test
    public void getBookings() throws Exception {
       List<Booking> bookings = bookingService.findAll();
       assertThat(bookings).isNotEmpty();
    }

    @Test
    public void getBookingById() throws Exception {
        Booking booking = bookingService.getBooking(1L);
        assertThat(booking.getId()).isEqualTo(1);
    }
}
