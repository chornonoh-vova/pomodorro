import 'package:flutter/material.dart';
import 'package:pomodorro/src/custom_icons.dart';
import 'package:pomodorro/src/screens/pomo.dart';
import 'package:pomodorro/src/screens/settings.dart';
import 'package:pomodorro/src/screens/stats.dart';
import 'package:pomodorro/src/screens/tasks.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  void _onItemTap(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _currentIndex, children: const [
        PomoScreen(),
        TasksScreen(),
        StatsScreen(),
        SettingsScreen(),
      ]),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _currentIndex,
        onTap: _onItemTap,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(CustomIcons.pomo),
            label: 'Pomo',
          ),
          BottomNavigationBarItem(
            icon: Icon(CustomIcons.tasks),
            label: 'Tasks',
          ),
          BottomNavigationBarItem(
            icon: Icon(CustomIcons.stats),
            label: 'Stats',
          ),
          BottomNavigationBarItem(
            icon: Icon(CustomIcons.settings),
            label: 'Settings',
          ),
        ],
      ),
    );
  }
}
