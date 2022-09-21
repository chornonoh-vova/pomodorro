import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../navigation';
import { useTheme } from '../hooks/useTheme';

type AboutScreenProps = NativeStackScreenProps<StackParamList, 'About'>;

export default function AboutScreen(_props: AboutScreenProps) {
  const theme = useTheme();

  const process = [
    { text: 'Get a to-do list and a timer.' },
    {
      text: 'Set your timer for 25 minutes, and focus on a single task until the timer rings.',
    },
    {
      text: 'When your session ends, mark off one pomodoro and record what you completed.',
    },
    { text: 'Then enjoy a five-minute break.' },
    {
      text: 'After four pomodoros, take a longer, more restorative 15-30 minute break.',
    },
  ];

  const rules = [
    {
      title: 'Break down complex projects.',
      text: 'If a task requires more than four pomodoros, it needs to be divided into smaller, actionable steps. Sticking to this rule will help ensure you make clear progress on your projects.',
    },
    {
      title: 'Small tasks go together.',
      text: 'Any tasks that will take less than one Pomodoro should be combined with other simple tasks. For example, "write rent check," "set vet appointment," and "read Pomodoro article" could go together in one session.',
    },
    {
      title: 'Once a pomodoro is set, it must ring.',
      text: 'The pomodoro is an indivisible unit of time and can not be broken, especially not to check incoming emails, team chats, or text messages. Any ideas, tasks, or requests that come up should be taken note of to come back to later. A digital task manager is a great place for these, but pen and paper will do too.',
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[{ color: theme.colors.text }, styles.title]}>
          What is the Pomodoro Technique?
        </Text>

        <Text style={[{ color: theme.colors.text }, styles.paragraph]}>
          The Pomodoro Technique was developed in the late 1980s by then
          university student Francesco Cirillo. Cirillo was struggling to focus
          on his studies and complete assignments. Feeling overwhelmed, he asked
          himself to commit to just 10 minutes of focused study time. Encouraged
          by the challenge, he found a tomato (pomodoro in Italian) shaped
          kitchen timer, and the Pomodoro technique was born.
        </Text>

        <Text style={[{ color: theme.colors.text }, styles.paragraph]}>
          Though Cirillo went on to write a 130-page book about the method, its
          biggest strength is its simplicity:
        </Text>

        <View style={styles.list}>
          {process.map((item, index) => {
            return (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listItemText}>{index + 1}. </Text>
                <Text style={styles.listItemText}>{item.text}</Text>
              </View>
            );
          })}
        </View>

        <Text style={[{ color: theme.colors.text }, styles.paragraph]}>
          The 25-minute work sprints are the core of the method, but a Pomodoro
          practice also includes three rules for getting the most out of each
          interval:
        </Text>

        <View style={styles.list}>
          {rules.map((item, index) => {
            return (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listItemText}>{index + 1}. </Text>
                <Text style={styles.listItemText}>
                  <Text style={styles.bold}>{item.title} </Text>
                  {item.text}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={[{ color: theme.colors.text }, styles.paragraph]}>
          In the event of an unavoidable disruption, take your five-minute break
          and start again. Cirillo recommends that you track interruptions
          (internal or external) as they occur and reflect on how to avoid them
          in your next session.
        </Text>

        <Text style={[{ color: theme.colors.text }, styles.paragraph]}>
          The rule applies even if you do finish your given task before the
          timer goes off. Use the rest of your time for overlearning, or
          improving skills or scope of knowledge. For example, you could spend
          the extra time reading up on professional journals or researching
          networking opportunities.
        </Text>

        <Text style={[{ color: theme.colors.text }, styles.paragraph]}>
          If the system seems simple, that's because it is. The Pomodoro
          technique is all about getting your mind in the zone to finish your
          tasks.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
    marginHorizontal: 20,
  },

  list: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 16,
  },

  listItem: {
    flexDirection: 'row',
    marginTop: 8,
  },

  listItemText: {
    fontSize: 16,
    fontWeight: '400',
  },

  bold: {
    fontWeight: 'bold',
  },

  scrollView: {
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 16,
  },

  paragraph: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 16,
  },
});
