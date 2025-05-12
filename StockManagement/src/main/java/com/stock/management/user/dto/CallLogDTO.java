package com.stock.management.user.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CallLogDTO {
    
    private int no;
    private String requesterId;
    private String requesterName;
    private String requesterDept;
    private String requesterLocation;
    private String reason;
    private LocalDateTime requesterDate;
}
