package com.digicert.booking.rest;

import com.digicert.booking.entity.Booking;
import com.digicert.booking.service.BookingService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/booking")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity createBooking(@RequestBody Booking booking) throws Exception {
        Booking savedBooking = bookingService.save(booking);
        System.out.println("In here = "+savedBooking.toString());
        return new ResponseEntity<>(savedBooking, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteBooking(@RequestBody Booking booking) throws Exception {
        bookingService.delete(booking);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity updateBooking(@RequestBody Booking booking) throws Exception {
        Booking savedBooking = bookingService.update(booking);
        return new ResponseEntity<>(savedBooking, HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public ResponseEntity findAll() throws Exception {
        List<Booking> bookings = bookingService.findAll();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity getBooking(@PathVariable long id) throws Exception {
        Booking booking = bookingService.getBooking(id);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }
}
