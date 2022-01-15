import 'package:sqflite/sqflite.dart';

import 'package:pomodorro/src/models/task.dart';

import 'tables.dart';
import 'helper.dart';
import '../task_repository.dart';

class DbTaskRepository implements TaskRepository {
  late final DbHelper _dbProvider;
  final TasksTable _table = DbHelper.tables['tasks'] as TasksTable;

  DbTaskRepository({
    required String path,
    required DatabaseFactory factory,
  }) {
    _dbProvider = DbHelper(path: path, factory: factory);
  }

  Future<Database> get _database async {
    return _dbProvider.database;
  }

  Task _taskFromMap(Map<String, dynamic> element) {
    return Task(
      id: element[_table.id.name],
      title: element[_table.title.name],
      description: element[_table.description.name],
      done: element[_table.done.name] == 1,
    );
  }

  Map<String, dynamic> _mapFromValues({
    required String title,
    required String description,
    required bool done,
  }) {
    return {
      _table.title.name: title,
      _table.description.name: description,
      _table.done.name: done ? 1 : 0,
    };
  }

  @override
  Future<Task> create({
    required String title,
    required String description,
    required bool done,
  }) async {
    final db = await _database;

    final id = await db.insert(
      _table.name,
      _mapFromValues(
        title: title,
        description: description,
        done: done,
      ),
    );

    return Task(
      id: id,
      title: title,
      description: description,
      done: done,
    );
  }

  @override
  Future<int> delete(int id) async {
    final db = await _database;

    return db.delete(
      _table.name,
      where: '${_table.id.name} = ?',
      whereArgs: [id],
    );
  }

  @override
  Future<List<Task>> getAll() async {
    final db = await _database;
    final rows = await db.query(_table.name);

    return rows.map(_taskFromMap).toList();
  }

  @override
  Future<Task> getOne(int id) async {
    final db = await _database;
    final rows = await db.query(
      _table.name,
      where: '${_table.id.name} = ?',
      whereArgs: [id],
      limit: 1,
    );

    return rows.map(_taskFromMap).toList().first;
  }

  @override
  Future<List<Task>> search(String query) async {
    final db = await _database;
    final rows = await db.query(
      _table.name,
      where: '${_table.title.name} LIKE ?',
      whereArgs: ['%$query%'],
    );

    return rows.map(_taskFromMap).toList();
  }

  @override
  Future<Task?> update(
    int id, {
    String? title,
    String? description,
    bool? done,
  }) async {
    final db = await _database;

    final original = await getOne(id);

    final updated = await db.update(
      _table.name,
      _mapFromValues(
        title: title ?? original.title,
        description: description ?? original.description,
        done: done ?? original.done,
      ),
      where: '${_table.id.name} = ?',
      whereArgs: [id],
    );

    if (updated == 1) {
      return Task(
        id: id,
        title: title ?? original.title,
        description: description ?? original.description,
        done: done ?? original.done,
      );
    }

    return null;
  }
}
