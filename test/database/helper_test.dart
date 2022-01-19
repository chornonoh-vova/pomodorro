import 'package:test/test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:sqflite/sqflite.dart';

import 'package:pomodorro/src/database/helper.dart';
import 'package:pomodorro/src/database/tables.dart';

final regExp = RegExp(r'\s{2,}');

void main() {
  setUpAll(() {
    // Initialize FFI for tests
    sqfliteFfiInit();

    // Change defaultFactory
    databaseFactory = databaseFactoryFfi;
  });

  group('DbHelper', () {
    late final DbHelper dbHelper;
    late final Database db;

    const tasks = TasksTable();
    const pomos = PomosTable();

    setUpAll(() async {
      dbHelper = DbHelper(
        path: inMemoryDatabasePath,
        factory: databaseFactory,
      );

      db = await dbHelper.database;
    });

    tearDownAll(() async => (await dbHelper.database).close());

    test('Should get database version', () async {
      expect(await db.getVersion(), version);
    });

    test('Should create tasks table', () async {
      final desc = (await db.rawQuery('''
        SELECT * FROM sqlite_master
        WHERE type = "table" and name = "${tasks.name}"
      '''));

      expect(desc.length, 1);

      expect(
        desc.first['sql'].toString().replaceAll(regExp, ''),
        tasks.createTableInitial().replaceAll(regExp, ''),
      );
    });

    test('Should create pomos table', () async {
      final desc = (await db.rawQuery('''
        SELECT * FROM sqlite_master
        WHERE type = "table" and name = "${pomos.name}"
      '''));

      expect(desc.length, 1);

      expect(
        desc.first['sql'].toString().replaceAll(regExp, ''),
        pomos.createTableInitial().replaceAll(regExp, ''),
      );
    });
  });
}
