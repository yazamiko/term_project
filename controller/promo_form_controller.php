<?php
	//require('../model/promo.php');
	require('../dao/promo_dao.php');

	$newPromo = new Promo();
	$promoDAO = new PromoDAO();

	$newPromo->setPromoCode($_POST["promo_code"]);
	$newPromo->setName($_POST["name"]);
	$newPromo->setDescription($_POST["description"]);
	$newPromo->setAmountOff($_POST["amount_off"]);
	$newPromo->setPromoType($_POST["promo_type"]);

	$promoDAO->create($newPromo);

	header("Location:../");
?>