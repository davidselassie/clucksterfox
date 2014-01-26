#pragma strict

private var playerControlsTag : String;

private var cameraComponent : OverheadCamera;
private var spawningComponent : SpawningComponent;
private var player : GameObject = null;

static class NextLevelParams {
	public var playerControlsTag : String = "Chicken";
	public var chickenIsDead : int = 0;
	public var totalEnemies : float = Mathf.Infinity;
}

function Start () {
	cameraComponent = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(OverheadCamera);
	spawningComponent = GetComponent(SpawningComponent);

	playerControlsTag = NextLevelParams.playerControlsTag;

	LinkControlToObjectOfTag(playerControlsTag);
}

// After we've updated all of the health, see if we need to link to a new object.
function LateUpdate () {
	if (LevelOver()) {
		if (playerControlsTag == "Fox") {
			NextLevelParams.playerControlsTag = "Chicken";	
			NextLevelParams.chickenIsDead = 0;
			NextLevelParams.totalEnemies = Mathf.Infinity;
			Application.LoadLevel("CreditsScene");		
		} else {
			NextLevelParams.playerControlsTag = "Fox";	
			NextLevelParams.chickenIsDead = 0;
			NextLevelParams.totalEnemies = 100;
			Application.LoadLevel("FoxTransition");			
		}
	}
	
	if (!player && playerControlsTag == "Fox") {
		LinkControlToObjectOfTag(playerControlsTag);
	}
}

public function LevelOver () {
	if (NextLevelParams.chickenIsDead) {
		return true;
	}
	if (spawningComponent.DoneSpawning()) {
		return true;
	}
	return false;
}

public function LinkControlToObjectOfTag (desiredTag : String) : boolean {
	var nextObjectToAddPlayerComponent : GameObject = GameObject.FindGameObjectWithTag(desiredTag);

	if (nextObjectToAddPlayerComponent) {
		var aiComponent : AIFollowAttackComponent = nextObjectToAddPlayerComponent.GetComponent(AIFollowAttackComponent);
		if (aiComponent) {
			Destroy(aiComponent);
		}
		var inputComponent : PlatformInputController = nextObjectToAddPlayerComponent.GetComponent(PlatformInputController);
		if (!inputComponent) {
			nextObjectToAddPlayerComponent.AddComponent(PlatformInputController);
		}
		cameraComponent.target = nextObjectToAddPlayerComponent.transform;

		Debug.Log(String.Format("Player now controlling {0}.", nextObjectToAddPlayerComponent.GetInstanceID()));
		player = nextObjectToAddPlayerComponent;
	}
	else {
		Debug.Log(String.Format("No object with tag {0} to link user control to.", desiredTag));
		player = null;
	}
	return player != null;
}
