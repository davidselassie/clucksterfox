#pragma strict

public var maxHealth : float = 100.0f;

private var health : float;

function Start () {
	health = maxHealth;
}

public function Alive () : boolean {
	return health > 0.0f;
}

public function Health () : float {
	return health;
}

public function Hurt (damage : float) {
	health -= damage;
	Debug.Log(String.Format("Ow. {0} {1}", gameObject, health));
	if (!Alive()) {
		if(gameObject.tag == "Chicken") NextLevelParams.chickenIsDead = 1;
		Destroy(gameObject);
	}
}
