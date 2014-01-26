#pragma strict

public var maxHealth : float = 100.0f;
private var health : float = maxHealth;

public function Alive () : boolean {
	return health > 0.0f;
}

public function Health () : float {
	return health;
}

public function Hurt (damage : float) {
	health -= damage;
	if (!Alive()) {
		Destroy(gameObject);
	}
}
