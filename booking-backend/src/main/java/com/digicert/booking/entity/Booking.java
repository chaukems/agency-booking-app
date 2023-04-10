package com.digicert.booking.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "Bookings")
@ToString
public class Booking {

    @Id
    @Column(name = "ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String startDate;
    private String endDate;
    private String roomType;
    private String requirements;
    private int adults;
    private int children;
    private int nights;
    private String requests;
    private String entryDate;
    private String status;
}
