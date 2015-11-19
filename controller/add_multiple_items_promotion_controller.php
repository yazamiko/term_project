<?php
require('../dao/item_dao.php');

session_start();
$arrItemNumbers = $_SESSION['item_number_values'];

$myArray = array();

$promoCode = $_POST['promo_code'];

$itemDAO = new ItemDAO();

foreach ($arrItemNumbers as $itemNumber){
	$myArray[] = $itemDAO->addItemToPromotion($itemNumber, $promoCode);
	//echo $itemNumber;
}
$result = $myArray[0];

foreach ($myArray as $arr)
{
	if($arr['status'] == false)
	{
		$result = $arr;
		break;
	}
}

echo json_encode($result);
?>