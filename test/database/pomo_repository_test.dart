import 'package:test/test.dart';
import 'package:sqflite/sqflite.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

import 'package:pomodorro/src/database/repositories/task_repository.dart';
import 'package:pomodorro/src/repositories/task_repository.dart';

import 'package:pomodorro/src/repositories/pomo_repository.dart';
import 'package:pomodorro/src/database/repositories/pomo_repository.dart';

void main() {
  setUpAll(() async {
    // Initialize FFI for tests
    sqfliteFfiInit();

    // Change defaultFactory
    databaseFactory = databaseFactoryFfi;
  });

  group('DbPomosRepository', () {
    late final PomoRepository pomos;
    late final TaskRepository tasks;

    setUpAll(() {
      pomos = DbPomoRepository(
        path: inMemoryDatabasePath,
        factory: databaseFactory,
      );

      tasks = DbTaskRepository(
        path: inMemoryDatabasePath,
        factory: databaseFactory,
      );
    });

    tearDown(() => pomos.deleteAll());

    tearDownAll(() => databaseFactory.deleteDatabase(inMemoryDatabasePath));

    test('Should add one pomo without task', () async {
      final pomo = await pomos.create(
        time: DateTime.now().toUtc(),
      );

      expect(await pomos.getOne(pomo.id), pomo);
    });

    test('Should add one pomo with task', () async {
      final task = await tasks.create(
        title: 'Test title',
        description: 'Test description',
        done: false,
      );

      final pomo = await pomos.create(
        time: DateTime.now().toUtc(),
        task: task,
      );

      expect(await pomos.getOne(pomo.id), pomo);
      expect((await pomos.getOne(pomo.id))?.task, task);
    });

    test('Should add list of pomos without tasks', () async {
      final pomo1 = await pomos.create(
        time: DateTime.now().toUtc(),
      );

      final pomo2 = await pomos.create(
        time: DateTime.now().toUtc(),
      );

      final pomo3 = await pomos.create(
        time: DateTime.now().toUtc(),
      );

      expect(await pomos.getAll(), [pomo1, pomo2, pomo3]);
    });

    test('Should add list of pomos with task', () async {
      final task = await tasks.create(
        title: 'Test title',
        description: 'Test description',
        done: false,
      );

      final pomo1 = await pomos.create(
        time: DateTime.now().toUtc(),
        task: task,
      );

      final pomo2 = await pomos.create(
        time: DateTime.now().toUtc(),
        task: task,
      );

      final pomo3 = await pomos.create(
        time: DateTime.now().toUtc(),
        task: task,
      );

      expect(await pomos.getAll(), [pomo1, pomo2, pomo3]);
    });
  });
}
