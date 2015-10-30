<?php
	session_start();

	$_SESSION['item_number_values'] = $checkboxValue = $_POST['items'];
	
	header("Location: ../view/search_promotion.html");
?>