import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

import 'src/repositories/task_repository.dart';
import 'src/repositories/db/task_repository.dart';

import 'src/app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final path = join(await getDatabasesPath(), 'pomodorro.db');

  GetIt.I.registerSingleton<TaskRepository>(
    DbTaskRepository(
      path: path,
      factory: databaseFactory,
    ),
  );

  runApp(const PomodorroApp());
}
