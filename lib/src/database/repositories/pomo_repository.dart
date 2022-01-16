import 'package:sqflite/sqflite.dart';

import 'package:pomodorro/src/models/task.dart';
import 'package:pomodorro/src/models/pomo.dart';
import 'package:pomodorro/src/repositories/pomo_repository.dart';

import '../dtos/pomo_dto.dart';
import '../helper.dart';
import '../tables.dart';

class DbPomoRepository implements PomoRepository {
  late final DbHelper _dbHelper;
  final PomosTable _pomos = DbHelper.tables['pomos'] as PomosTable;
  final TasksTable _tasks = DbHelper.tables['tasks'] as TasksTable;

  DbPomoRepository({
    required String path,
    required DatabaseFactory factory,
  }) {
    _dbHelper = DbHelper(path: path, factory: factory);
  }

  @override
  Future<Pomo> create({required DateTime time, Task? task}) async {
    final db = await _dbHelper.database;

    final id = await db.insert(
      _pomos.name,
      PomoDto.fromValues(
        time: time,
        task: task,
      ).toMap(),
    );

    return Pomo(
      id: id,
      time: time,
      task: task,
    );
  }

  @override
  Future<int> delete(int id) async {
    final db = await _dbHelper.database;

    return db.delete(
      _pomos.name,
      where: '${_pomos.id.name} = ?',
      whereArgs: [id],
    );
  }

  String _buildRawQuery({String? where, int? limit}) {
    return '''SELECT
        ${_pomos.name}.${_pomos.id.name} as ${_pomos.id.name},
        ${_pomos.name}.${_pomos.time.name} as ${_pomos.time.name},
        ${_pomos.name}.${_pomos.taskId.name} as ${_pomos.taskId.name},
        ${_tasks.name}.${_tasks.title.name} as ${_tasks.title.name},
        ${_tasks.name}.${_tasks.description.name} as ${_tasks.description.name},
        ${_tasks.name}.${_tasks.done.name} as ${_tasks.done.name}
      FROM ${_pomos.name}
      LEFT JOIN ${_tasks.name}
      ON ${_pomos.name}.${_pomos.taskId.name} = ${_tasks.name}.${_tasks.id.name}
      ${where != null ? 'WHERE $where' : ''}
      ${limit != null ? 'LIMIT $limit' : ''}
      '''
        .trim();
  }

  @override
  Future<List<Pomo>> getAll() async {
    final db = await _dbHelper.database;
    final rows = await db.rawQuery(_buildRawQuery());

    return rows.map((e) => PomoDto.fromMap(e).toPomo()).toList();
  }

  @override
  Future<Pomo?> getOne(int id) async {
    final db = await _dbHelper.database;
    final rows = await db.rawQuery(
      _buildRawQuery(where: '${_pomos.name}.${_pomos.id.name} = ?', limit: 1),
      [id],
    );

    if (rows.isNotEmpty) {
      return PomoDto.fromMap(rows.first).toPomo();
    }

    return null;
  }

  @override
  Future<Pomo?> update(int id, {DateTime? time, Task? task}) async {
    final db = await _dbHelper.database;

    final original = await getOne(id);

    if (original == null) return null;

    final updated = await db.update(
      _pomos.name,
      PomoDto.fromValues(
        time: time ?? original.time,
        task: task ?? original.task,
      ).toMap(),
      where: '${_pomos.id.name} = ?',
      whereArgs: [id],
    );

    if (updated == 0) return null;

    return Pomo(
      id: id,
      time: time ?? original.time,
      task: task ?? original.task,
    );
  }

  @override
  Future<int> deleteAll() async {
    final db = await _dbHelper.database;

    return db.delete(_pomos.name);
  }
}
