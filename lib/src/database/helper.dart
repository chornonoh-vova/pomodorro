import 'package:sqflite/sqflite.dart';

import 'tables.dart';

class DbHelper {
  static const tables = {
    'tasks': TasksTable(),
    'pomos': PomosTable(),
  };

  final String path;
  final DatabaseFactory factory;
  Database? _db;

  DbHelper({
    required this.path,
    required this.factory,
  });

  Future<Database> get database async {
    if (_db == null) {
      await _openDb();
    }

    return _db!;
  }

  Future<void> _openDb() async {
    _db = await factory.openDatabase(
      path,
      options: OpenDatabaseOptions(
        version: version,
        onConfigure: _onConfigureDb,
        onCreate: _onCreateDb,
        onUpgrade: _onUpgradeDb,
        onDowngrade: _onDowngradeDb,
      ),
    );
  }

  Future<void> _onConfigureDb(Database db) async {
    // enable foreign keys
    await db.execute('PRAGMA foreign_keys = ON');
  }

  Future<void> _onCreateDb(Database db, int version) async {
    await db.transaction((txn) async {
      for (final table in tables.values) {
        if (table.fromVersion <= version) {
          await txn.execute(table.dropIfNotExists());
          await txn.execute(table.createTableInitial());
        }
      }
    });
  }

  Future<void> _onUpgradeDb(
    Database db,
    int oldVersion,
    int newVersion,
  ) async {
    await db.transaction((txn) async {
      for (final table in tables.values) {
        final migrations = table.migrateUp(oldVersion, newVersion);
        if (migrations.isNotEmpty) {
          for (final migration in migrations) {
            await txn.execute(migration);
          }
        }
      }
    });
  }

  Future<void> _onDowngradeDb(
    Database db,
    int oldVersion,
    int newVersion,
  ) async {
    await db.transaction((txn) async {
      for (final table in tables.values) {
        final migrations = table.migrateDown(oldVersion, newVersion);
        if (migrations.isNotEmpty) {
          for (final migration in migrations) {
            await db.execute(migration);
          }
        }
      }
    });
  }
}
