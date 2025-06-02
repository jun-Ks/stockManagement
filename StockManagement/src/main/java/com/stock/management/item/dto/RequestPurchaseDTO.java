package com.stock.management.item.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RequestPurchaseDTO {
    private int no;
    private String itemCode;
    private int itemId;
    private String type;
    private String itemName;
    private String drawingNo;
    private String note;
    private int quantity;
    private int requestQuantity;
    private String location;
    private String requesterId;
    private String requesterName;
    private String requesterDept;
    private int approval;
    private String groupId;
    private LocalDateTime insertDate;
    private String approvalUserName;
    private LocalDateTime approvalDate;
}
