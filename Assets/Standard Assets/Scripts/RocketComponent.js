
#pragma strict

public var damage : float = 10.0f;
public var damageRadius : float = 5.0f;
public var startSpeed: float = 3.0f;
public var maxSpeed : float= 5.0f;
public var maxDistance : float= 100.0f;
public var acceleration : float = 9.8f;
public var explosionPrefab : Transform;

private var velocity : Vector3;
private var birthTime : float;

function Start () {
	var velocity = startSpeed * Vector3.forward;
	transform.Translate(velocity * Time.deltaTime);
	birthTime = Time.time;
}

function Update () {
	velocity += acceleration * Time.deltaTime * Vector3.forward;
	transform.Translate(velocity * Time.deltaTime);
	
	var distanceTraveled = Mathf.Pow(Time.time - birthTime, 2 ) * 0.5 * acceleration;
	if(distanceTraveled > maxDistance){
		Destroy(gameObject);
	}
}

function OnTriggerEnter (collider : Collider) {
	Instantiate(explosionPrefab, transform.position, Quaternion.identity);
	Destroy(gameObject);
	var collisions = Physics.OverlapSphere(transform.position,damageRadius);
	for(var collision : Collider in collisions){
		if(collision.gameObject.tag == "Chicken") continue;
		var livingEntity = collision.gameObject.GetComponent(LivingComponent);
		if (livingEntity) {
			livingEntity.Hurt(damage);
			Debug.Log("Rocket Damage!");
		}
	}
}
