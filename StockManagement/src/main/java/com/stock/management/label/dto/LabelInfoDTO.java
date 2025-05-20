package com.stock.management.label.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class LabelInfoDTO {
    
    private int no;
    private String rackName;
    private String rackNumber;
    private String rackStage;
    private String fullName;
    private LocalDateTime insertDate;
}
