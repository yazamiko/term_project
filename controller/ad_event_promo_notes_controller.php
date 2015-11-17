<?php
	session_start();
	
	$_SESSION['ad_event_promo_code'] = $_POST['promoCodes'];
	
	header("Location: ../view/ad_event_promo_notes.html");
?>