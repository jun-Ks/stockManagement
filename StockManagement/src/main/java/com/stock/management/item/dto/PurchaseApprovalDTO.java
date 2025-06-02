package com.stock.management.item.dto;

import lombok.Data;

@Data
public class PurchaseApprovalDTO {
    private String approvalUser;
    private int itemId;
    private int requestListId;
    private int requestQuantity;
}
