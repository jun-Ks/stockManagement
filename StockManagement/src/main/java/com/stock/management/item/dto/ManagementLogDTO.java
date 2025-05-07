package com.stock.management.item.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ManagementLogDTO {
	private String no;
	private String userId;
	private String userDept;
	private String userName;
	private int itemId;
	private String type;
	private String drawingNo;
	private LocalDateTime loggedDate;
}
