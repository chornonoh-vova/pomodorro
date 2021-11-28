import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            onPressed: () => Navigator.pushNamed(context, 'settings'),
            icon: const Icon(Icons.settings),
          ),
        ],
        title: const Text('Pomodorro'),
      ),
      body: Center(
        child: Text(
          'Home screen',
          style: textTheme.bodyText1,
        ),
      ),
    );
  }
}
