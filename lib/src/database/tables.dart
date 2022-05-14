const int version = 1;

class Column {
  final String name;
  final String definition;

  const Column({required this.name, required this.definition});
}

abstract class Table {
  final String name;
  final int fromVersion;

  final Column id = const Column(
    name: 'id',
    definition: 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT',
  );

  const Table({required this.name, required this.fromVersion});

  String dropIfNotExists() {
    return 'DROP TABLE IF EXISTS $name';
  }

  String createTableInitial();

  List<String> migrateUp(int oldVersion, int newVersion) {
    final List<String> migrations = [];

    return migrations;
  }

  List<String> migrateDown(int oldVersion, int newVersion) {
    final List<String> migrations = [];

    return migrations;
  }
}

class TasksTable extends Table {
  final Column title = const Column(
    name: 'title',
    definition: 'TEXT NOT NULL',
  );
  final Column description = const Column(
    name: 'description',
    definition: 'TEXT DEFAULT ""',
  );
  final Column done = const Column(
    name: 'done',
    definition: 'INTEGER DEFAULT 0',
  );

  const TasksTable() : super(name: 'tasks', fromVersion: 1);

  @override
  String createTableInitial() {
    return '''
      CREATE TABLE $name(
        ${id.name} ${id.definition},
        ${title.name} ${title.definition},
        ${description.name} ${description.definition},
        ${done.name} ${done.definition}
      )
      '''
        .trim();
  }
}

class PomosTable extends Table {
  final Column startTime = const Column(
    name: 'start_time',
    definition: 'INTEGER NOT NULL',
  );
  final Column endTime = const Column(
    name: 'end_time',
    definition: 'INTEGER NOT NULL',
  );
  final Column taskId = const Column(
    name: 'task_id',
    definition: 'INTEGER DEFAULT NULL',
  );

  const PomosTable() : super(name: 'pomos', fromVersion: 1);

  @override
  String createTableInitial() {
    return '''
      CREATE TABLE $name(
        ${id.name} ${id.definition},
        ${startTime.name} ${startTime.definition},
        ${endTime.name} ${endTime.definition},
        ${taskId.name} ${taskId.definition},
        FOREIGN KEY(${taskId.name}) REFERENCES tasks(id)
      )
      '''
        .trim();
  }
}