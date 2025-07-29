// HelpCard.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const HelpCard = ({ topic }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="p-4 dark:bg-gray-800">
        <div className="flex items-center mb-3">
          {topic.icon}
          <h3 className="ml-3 text-lg font-semibold">{topic.title}</h3>
        </div>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300">{topic.description}</p>
          {topic.isCallSupport && (
            <a
              href="tel:+18001234567"
              className="inline-block mt-3 text-blue-600 font-medium hover:underline"
            >
              📞 Call Now: +1 800-123-4567
            </a>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
