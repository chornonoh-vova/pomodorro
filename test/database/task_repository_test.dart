import 'package:test/test.dart';
import 'package:sqflite/sqflite.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

import 'package:pomodorro/src/repositories/task_repository.dart';
import 'package:pomodorro/src/database/repositories/task_repository.dart';

void main() {
  setUpAll(() {
    // Initialize FFI for tests
    sqfliteFfiInit();

    // Change defaultFactory
    databaseFactory = databaseFactoryFfi;
  });

  group('DbTasksRepository', () {
    late final TaskRepository tasks;

    setUpAll(() {
      tasks = DbTaskRepository(
        path: inMemoryDatabasePath,
        factory: databaseFactory,
      );
    });

    tearDown(() => tasks.deleteAll());

    tearDownAll(() => databaseFactory.deleteDatabase(inMemoryDatabasePath));

    test('Should add one task', () async {
      final task = await tasks.create(
        title: 'Test title',
        description: 'Test description',
        done: false,
      );

      expect(await tasks.getOne(task.id), task);
    });

    test('Should add list of tasks', () async {
      final task1 = await tasks.create(
        title: 'Test title',
        description: 'Test description',
        done: false,
      );

      final task2 = await tasks.create(
        title: 'Test title 2',
        description: 'Test description 2',
        done: true,
      );

      final task3 = await tasks.create(
        title: 'Test title 3',
        description: 'Test description 3',
        done: false,
      );

      expect(await tasks.getAll(), [task1, task2, task3]);
    });
  });
}
