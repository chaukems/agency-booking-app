package com.digicert.booking;

import com.digicert.booking.entity.Booking;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class BookingControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mvc;

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

      mvc.perform(MockMvcRequestBuilders.post("/booking/create")
                .content(objectMapper.writeValueAsString(booking))
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }


    @Test
    public void getBookingById() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/booking/{id}", 1)
                .accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1));
    }

    @Test
    public void updateBooking() throws Exception{
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Booking booking = new Booking();
        booking.setStatus("Confirmed");
        booking.setEntryDate(format.format(new Date()));
        booking.setStartDate("2023-04-25");
        booking.setEndDate("2023-04-27");
        booking.setRequests("N/A");
        booking.setRequirements("We need 2 more extra blankets");
        booking.setRoomType("Double");
        booking.setAdults(2);
        booking.setNights(2);
        booking.setChildren(0);

        mvc.perform( MockMvcRequestBuilders
                        .put("/booking/update", 2)
                        .content(objectMapper.writeValueAsString(booking))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("Confirmed"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.roomType").value("Double"));
    }

    @Test
    public void getBookings() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/booking/findAll")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*]").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].id").isNotEmpty());

    }

    @Test
    public void deleteBooking() throws Exception{
        Booking booking = new Booking();
        booking.setId(1L);
        mvc.perform(MockMvcRequestBuilders.delete("/booking/delete")
                .content(objectMapper.writeValueAsString(booking))
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
