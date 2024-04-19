import styles from "@/app/ui/dashboard/Help/Help.module.css";

import React from "react";

const Help = () => {
  return (
    <div className={styles.faqContainer}>
      <h2>Sprout CRM - Frequently Asked Questions</h2>
      <div className={styles.faqItem}>
        <h3 className={styles.faqQuestion}>What is Sprout CRM?</h3>
        <p className={styles.faqAnswer}>
          Sprout CRM is a web application designed to help businesses manage their
          customer relationships. It offers a user-friendly interface to add,
          view, and organize information about clients, products, users, and
          quotations.
        </p>
      </div>
      <div className={styles.faqItem}>
        <h3 className={styles.faqQuestion}>What are the benefits of using Sprout CRM?</h3>
        <p className={styles.faqAnswer}>
          Sprout CRM can help businesses improve their customer relationships in
          several ways. It can help you:
          <ul>
            <li>Centralize and organize client data.</li>
            <li>Track product information and manage inventory (if applicable).</li>
            <li>Manage user access and permissions.</li>
            <li>Create and manage quotations for clients.</li>
            <li>Improve overall sales and marketing efficiency.</li>
          </ul>
        </p>
      </div>
      <div className={styles.faqItem}>
        <h3 className={styles.faqQuestion}>Who can use Sprout CRM?</h3>
        <p className={styles.faqAnswer}>
          Sprout CRM is suitable for businesses of all sizes, from startups and
          freelancers to established companies. It is a great solution for
          businesses that need a simple and effective way to manage their
          customer interactions.
        </p>
      </div>
      <div className={styles.faqItem}>
        <h3 className={styles.faqQuestion}>Is Sprout CRM free to use?</h3>
        <p className={styles.faqAnswer}>
          Sprout CRM offers a free trial plan with limited features. Paid plans with additional features and storage are also available. Please refer to our pricing page for more details.
        </p>
      </div>
    </div>
  );
};

export default Help;
