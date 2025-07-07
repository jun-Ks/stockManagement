package com.stock.management.item.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class DeliveryLogDTO {
	private int no;
	private int id;
	private String userId;
	private String userName;
	private String userDept;
	private int itemId;

	private int cartQty;
	private LocalDateTime deliveryDate;
}
