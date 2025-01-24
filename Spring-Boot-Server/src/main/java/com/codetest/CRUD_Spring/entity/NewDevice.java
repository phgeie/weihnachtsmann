package com.codetest.CRUD_Spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import jakarta.persistence.*;

import java.util.Set;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "newDevice")
public class NewDevice {
    @TableGenerator(
            name = "yourTableGenerator",
            allocationSize = 1,
            initialValue = 0)
    @Id
    @GeneratedValue(
            strategy=GenerationType.TABLE,
            generator="yourTableGenerator")
    @Column(name = "deviceId")
    public long id;



}
