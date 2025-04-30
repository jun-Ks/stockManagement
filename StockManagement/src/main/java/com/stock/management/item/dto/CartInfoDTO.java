package com.stock.management.item.dto;

import lombok.Data;

@Data
public class CartInfoDTO {
	private String userId;
	private String userName;
	private String userDept;
	private int itemId;
	private int cartQty;
}
