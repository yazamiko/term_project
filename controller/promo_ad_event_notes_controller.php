<?php
	session_start();
	
	$_SESSION['ad_event_values'] = $_POST['adEvents'];
	
	header("Location: ../view/ad_event_promo_notes.html");
?>