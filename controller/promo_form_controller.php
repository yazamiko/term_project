<?php
	require('../dao/promo_dao.php');
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$newPromo = new Promo();
	$promoDAO = new PromoDAO();

	$newPromo->setPromoCode($_POST["promo_code"]);
	$newPromo->setName($_POST["name"]);
	$newPromo->setDescription($_POST["description"]);
	$newPromo->setAmountOff($_POST["amount_off"]);
	$newPromo->setPromoType($_POST["promo_type"]);

	$result = json_encode($promoDAO->create($newPromo));
	
	echo $result;

	//header("Location:../");
?>
