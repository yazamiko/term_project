<?php
	interface iDAO {
		public function create($obj);
		public function read($obj);
		public function update($obj);
		public function delete($obj);
	}
?>