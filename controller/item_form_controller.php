<?php
	//require('../model/item.php');
	require('../dao/item_dao.php');

	$newItem = new Item();
	$itemDAO = new ItemDAO();

	$newItem->setItemNumber($_POST["item_number"]);
	$newItem->setItemDescription($_POST["item_desc"]);
	$newItem->setCategory($_POST["category"]);
	$newItem->setDepartmentName($_POST["dept_name"]);
	$newItem->setPurchaseCost($_POST["purchase_cost"]);
	$newItem->setFullRetailPrice($_POST["full_retail_price"]);

	$itemDAO->create($newItem);

	header("Location:../");
?>