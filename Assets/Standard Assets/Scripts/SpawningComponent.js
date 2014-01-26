#pragma strict

import System.Linq;

public var startingEnemies : int = 1;
public var totalEnemies : int = 5;
public var enemiesPerSecond : float = 0.0f;

public var enemyPrefab : GameObject;
public var heroPrefab : GameObject;

private var spawnedEnemies : int = 0;

static var heroSpawnPoint : Vector3 = new Vector3(0.0f, 0.0f, 0.0f);

function Start () {
	SpawnHero();
	for (var i : int in Enumerable.Range(0, startingEnemies)) {
		SpawnRandomEnemy();
	}
	StartCoroutine(SpawnAndWaitLoop());
}

private function SpawnAndWaitLoop () : IEnumerator {
	if (spawnedEnemies < totalEnemies && enemiesPerSecond > 0.0f) {
		SpawnRandomEnemy();
		yield WaitForSeconds(1.0f / enemiesPerSecond);
		StartCoroutine(SpawnAndWaitLoop());
	}
}

public function SpawnHero () {
	var newHero : GameObject = Instantiate(heroPrefab, heroSpawnPoint, Quaternion.identity) as GameObject;
	var aiComponent : AIFollowAttackComponent = newHero.AddComponent(AIFollowAttackComponent);
	aiComponent.attackTag = enemyPrefab.tag;
}

public function SpawnRandomEnemy () {
	var newEnemy : GameObject = Instantiate(enemyPrefab, RandomPointOnXYCircle(7.0f), Quaternion.identity) as GameObject;
	var aiComponent : AIFollowAttackComponent = newEnemy.AddComponent(AIFollowAttackComponent);
	aiComponent.attackTag = heroPrefab.tag;
	spawnedEnemies++;
}

private function RandomPointOnXYCircle (radius : float) : Vector3 {
	var spawnPoint : Vector3 = Random.onUnitSphere * radius;
	spawnPoint.z = 0.0f;
	return spawnPoint;
}

public function DoneSpawning() {
	return spawnedEnemies >= totalEnemies;
}
