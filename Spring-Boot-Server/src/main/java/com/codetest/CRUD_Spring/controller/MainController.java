package com.codetest.CRUD_Spring.controller;

import com.codetest.CRUD_Spring.entity.XmasWishObject;
import com.codetest.CRUD_Spring.model.XmasWish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.codetest.CRUD_Spring.repository.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController // This means that this class is a Controller
@RequestMapping(path="/data") // This means URL's start with /data (after Application path)
public class MainController {
    @Autowired
    private XmasWishRepository xmasWishRepository;

    @PostMapping("/add")
    public void add(@RequestBody XmasWishObject xmasWishObject){
        XmasWish xmasWish = new XmasWish();
        xmasWish.setName(xmasWishObject.name);
        xmasWish.setWish(xmasWishObject.wish);
        xmasWish.setStatus(1);
        xmasWishRepository.save(xmasWish);
    }

    @GetMapping("/get")
    public @ResponseBody ResponseEntity<Iterable<XmasWish>> get(@RequestParam String name){
        List<XmasWish> found = new ArrayList<>();
        for (XmasWish xmasWish : xmasWishRepository.findAll()) {
            if (!name.isEmpty()) {
                if (xmasWish.getName() == null) continue;
                if (!xmasWish.getName().equalsIgnoreCase(name)) continue;
            }
            found.add(xmasWish);
        }
        return ResponseEntity.ok(found);
    }

    @GetMapping("/setStatus")
    public int setStatus(@RequestParam String id, @RequestParam int status){
        for (XmasWish xmasWish : xmasWishRepository.findAll()) {
            if (!id.isEmpty()) {
                if (xmasWish.getId() == null) continue;

                if (!xmasWish.getId().equalsIgnoreCase(id)) continue;
            }
            xmasWish.setStatus(status);
            xmasWishRepository.save(xmasWish);
            return 0;
        }
        return 1;
    }
}