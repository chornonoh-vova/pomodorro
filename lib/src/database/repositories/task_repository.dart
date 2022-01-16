import 'package:sqflite/sqflite.dart';

import 'package:pomodorro/src/models/task.dart';
import 'package:pomodorro/src/repositories/task_repository.dart';

import '../tables.dart';
import '../helper.dart';
import '../dtos/task_dto.dart';

class DbTaskRepository implements TaskRepository {
  late final DbHelper _dbHelper;
  final TasksTable _tasks = DbHelper.tables['tasks'] as TasksTable;

  DbTaskRepository({
    required String path,
    required DatabaseFactory factory,
  }) {
    _dbHelper = DbHelper(path: path, factory: factory);
  }

  @override
  Future<Task> create({
    required String title,
    required String description,
    required bool done,
  }) async {
    final db = await _dbHelper.database;

    final id = await db.insert(
      _tasks.name,
      TaskDto.fromValues(
        title: title,
        description: description,
        done: done,
      ).toMap(),
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
    final db = await _dbHelper.database;

    return db.delete(
      _tasks.name,
      where: '${_tasks.id.name} = ?',
      whereArgs: [id],
    );
  }

  @override
  Future<List<Task>> getAll() async {
    final db = await _dbHelper.database;
    final rows = await db.query(_tasks.name);

    return rows.map((e) => TaskDto.fromMap(e).toTask()).toList();
  }

  @override
  Future<Task?> getOne(int id) async {
    final db = await _dbHelper.database;
    final rows = await db.query(
      _tasks.name,
      where: '${_tasks.id.name} = ?',
      whereArgs: [id],
      limit: 1,
    );

    if (rows.isNotEmpty) {
      return TaskDto.fromMap(rows.first).toTask();
    }

    return null;
  }

  @override
  Future<List<Task>> search(String query) async {
    final db = await _dbHelper.database;
    final rows = await db.query(
      _tasks.name,
      where: '${_tasks.title.name} LIKE ?',
      whereArgs: ['%$query%'],
    );

    return rows.map((e) => TaskDto.fromMap(e).toTask()).toList();
  }

  @override
  Future<Task?> update(
    int id, {
    String? title,
    String? description,
    bool? done,
  }) async {
    final db = await _dbHelper.database;

    final original = await getOne(id);

    if (original == null) return null;

    final updated = await db.update(
      _tasks.name,
      TaskDto.fromValues(
        title: title ?? original.title,
        description: description ?? original.description,
        done: done ?? original.done,
      ).toMap(),
      where: '${_tasks.id.name} = ?',
      whereArgs: [id],
    );

    if (updated == 0) return null;

    return Task(
      id: id,
      title: title ?? original.title,
      description: description ?? original.description,
      done: done ?? original.done,
    );
  }

  @override
  Future<int> deleteAll() async {
    final db = await _dbHelper.database;

    return db.delete(_tasks.name);
  }
}
