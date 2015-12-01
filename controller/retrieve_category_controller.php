<?php
	require('../dao/item_dao.php');
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
		
	$itemDAO = new ItemDAO();
	$result = null;
	
	$result = $itemDAO->loadCategories();
	
	echo json_encode($result);
?>