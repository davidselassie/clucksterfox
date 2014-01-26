#pragma strict

public var attackStrength : float = 5.0f;
public var attackRadius : float = 1.25f;
public var attackCycleSeconds : float = 0.75f;
public var attackTool : GameObject;

private var lastAttackTimeSeconds : float = Mathf.NegativeInfinity;
private var motorComponent : CharacterMotor;
private var toolAnimator : Animator;

function Awake () {
	motorComponent = GetComponent(CharacterMotor);
	toolAnimator = attackTool.GetComponent(Animator);
}

function Update () {
}

public function TryAttack () {
	if (CanAttackNow()) {
		Attack();
	}
}

private function CanAttackNow () : boolean {
	return lastAttackTimeSeconds + attackCycleSeconds < Time.time;
}

private function Attack () {
	var hits : RaycastHit[] = Physics.RaycastAll(gameObject.transform.position, motorComponent.lastInputMoveDirection, attackRadius);
	for (var hit : RaycastHit in hits) {
		// Don't hurt anyone with the same type tag.
		if (hit.collider.gameObject.tag != transform.parent.gameObject.tag) {
			var livingComponent : LivingComponent = hit.collider.gameObject.GetComponent(LivingComponent);
			if (livingComponent) {
				livingComponent.Hurt(attackStrength);
			}
		}
	}
	lastAttackTimeSeconds = Time.time;

	// Use your muscles.
	toolAnimator.SetInteger("State", 2);
	StartCoroutine(ResetAnimationStateSoon());
}

private function ResetAnimationStateSoon () : IEnumerator {
	yield WaitForSeconds(attackCycleSeconds);
	toolAnimator.SetInteger("State", 1);
}
