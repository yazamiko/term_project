<?php
	session_start();

	$_SESSION['ad_event_values'] = $checkboxValue = $_POST['adEvents'];
	
	header("Location: ../view/search_promotion_ad_event.html");
?>