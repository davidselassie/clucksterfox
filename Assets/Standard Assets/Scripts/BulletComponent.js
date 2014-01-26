
#pragma strict

public var damage : float = 10.0f;
public var speed : float= 5.0f;
public var maxDistance : float= 100.0f;

private var birthTime : float;
public var shooter : Transform;

function Start () {
	var velocity = speed * Vector3.forward;
	transform.Translate(velocity * Time.deltaTime);
	birthTime = Time.time;
}

function Update () {
	var velocity = speed * Vector3.forward;
	transform.Translate(velocity * Time.deltaTime);
	
	var distanceTraveled = (Time.time - birthTime) * speed;
	if(distanceTraveled > maxDistance){
		Destroy(gameObject);
	}
}

function OnTriggerEnter (collider : Collider) {
	if(collider.gameObject.tag == "Chicken") return;
	if(collider.gameObject == shooter) return;
	var livingEntity = collider.gameObject.GetComponent(LivingComponent);
	if (livingEntity) {
		livingEntity.Hurt(damage);
		Debug.Log("Bullet Damage!");
	}
	Destroy(gameObject);
}
