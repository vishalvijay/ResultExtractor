package Forms;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Main.resultFetch;
import java.awt.event.KeyEvent;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;
import run.DBConnect;

public class DisplayForm extends javax.swing.JFrame {

    ResultSet rs = null;
    Connection con = DBConnect.connection;
    DefaultTableModel model;
    DefaultTableModel firstTableModel;

    /**
     * Creates new form DisplayForm
     */
    public DisplayForm(String x) {

    }

    public DisplayForm() {

        int rowCount = 0;
        model = new DefaultTableModel();

        firstTableModel = new DefaultTableModel() {
            Class[] types = new Class[]{
                //COL. TYPES ARE HERE!!!  
                java.lang.Integer.class, java.lang.String.class, java.lang.String.class, java.lang.Integer.class, java.lang.String.class
            };

            @Override
            public Class getColumnClass(int columnIndex) {
                return types[columnIndex];
            }
        };

        model.addColumn("SUBJECT");
        model.addColumn("INTERNAL");
        model.addColumn("EXTERNAL");
        model.addColumn("TOTAL");
        model.addColumn("RESULT");

        initComponents();
        this.setLocationRelativeTo(null);
        if ((rs = getDetails("ALL")) != null) {

            //StudDetails.setModel(DbUtils.resultSetToTableModel(rs));
            firstTableModel.addColumn("Rank");
            firstTableModel.addColumn("USN");
            firstTableModel.addColumn("Name");
            firstTableModel.addColumn("Total");
            firstTableModel.addColumn("Class");

            try {
                while (rs.next()) {
                    String temp = rs.getString(4);
                    String ToBEInserted = "Oth";
                    if (temp.equalsIgnoreCase("FIRST CLASS WITH DISTINCTION ")) {
                        ToBEInserted = "FCD";
                    } else if (temp.equalsIgnoreCase("FIRST CLASS ")) {
                        ToBEInserted = "FC";
                    } else if (temp.equalsIgnoreCase("SECOND CLASS ")) {
                        ToBEInserted = "SC";
                    } else if (temp.equalsIgnoreCase("FAIL ")) {
                        ToBEInserted = "FAIL";
                    }
                    firstTableModel.insertRow(rowCount++, new Object[]{rowCount, rs.getString(2), rs.getString(1), rs.getString(3), ToBEInserted});
                }
            } catch (SQLException ex) {
                Logger.getLogger(DisplayForm.class.getName()).log(Level.SEVERE, null, ex);
            }
            StudDetails.setModel(firstTableModel);
            StudentNumberInfo.setText(StudDetails.getRowCount() + " Student Records found");
            StudDetails.getColumn("Rank").setPreferredWidth(50);
            StudDetails.getColumn("USN").setPreferredWidth(100);
            StudDetails.getColumn("Name").setPreferredWidth(150);
            StudDetails.getColumn("Total").setPreferredWidth(50);
            StudDetails.getColumn("Class").setPreferredWidth(50);
            StudDetails.setAutoCreateRowSorter(true);
        }

        retrieveSubjectNames();
        if (firstTableModel.getRowCount() != 0) {
            fillMarksTable(StudDetails.getValueAt(0, 1).toString());
        }
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        Panel1 = new javax.swing.JPanel();
        StudentNumberInfo = new javax.swing.JLabel();
        jScrollPane1 = new javax.swing.JScrollPane();
        StudDetails = new javax.swing.JTable();
        ClassCombo = new javax.swing.JComboBox();
        Panel2 = new javax.swing.JPanel();
        jScrollPane2 = new javax.swing.JScrollPane();
        StudentMarksTable = new javax.swing.JTable();
        jLabel1 = new javax.swing.JLabel();
        NameLabel = new javax.swing.JLabel();
        jlabel2 = new javax.swing.JLabel();
        TotalLabel = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        ResultLabel = new javax.swing.JLabel();
        bSave = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setResizable(false);

        Panel1.setBorder(javax.swing.BorderFactory.createTitledBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)), "Student Record", javax.swing.border.TitledBorder.CENTER, javax.swing.border.TitledBorder.DEFAULT_POSITION));

        StudentNumberInfo.setForeground(new java.awt.Color(0, 51, 255));
        StudentNumberInfo.setText("Select Students based on class");

        StudDetails.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        StudDetails.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                StudDetailsMouseClicked(evt);
            }
        });
        StudDetails.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyPressed(java.awt.event.KeyEvent evt) {
                StudDetailsKeyPressed(evt);
            }
            public void keyReleased(java.awt.event.KeyEvent evt) {
                StudDetailsKeyReleased(evt);
            }
        });
        jScrollPane1.setViewportView(StudDetails);

        ClassCombo.setModel(new javax.swing.DefaultComboBoxModel(new String[] { "ALL", "FIRST CLASS WITH DISTINCTION", "FIRST CLASS", "SECOND CLASS", "FAIL" }));
        ClassCombo.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                ClassComboMouseClicked(evt);
            }
        });
        ClassCombo.addItemListener(new java.awt.event.ItemListener() {
            public void itemStateChanged(java.awt.event.ItemEvent evt) {
                ClassComboItemStateChanged(evt);
            }
        });
        ClassCombo.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                ClassComboActionPerformed(evt);
            }
        });
        ClassCombo.addPropertyChangeListener(new java.beans.PropertyChangeListener() {
            public void propertyChange(java.beans.PropertyChangeEvent evt) {
                ClassComboPropertyChange(evt);
            }
        });

        javax.swing.GroupLayout Panel1Layout = new javax.swing.GroupLayout(Panel1);
        Panel1.setLayout(Panel1Layout);
        Panel1Layout.setHorizontalGroup(
            Panel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Panel1Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(Panel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
                    .addGroup(Panel1Layout.createSequentialGroup()
                        .addGroup(Panel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(StudentNumberInfo, javax.swing.GroupLayout.PREFERRED_SIZE, 225, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(ClassCombo, javax.swing.GroupLayout.PREFERRED_SIZE, 235, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(0, 152, Short.MAX_VALUE)))
                .addContainerGap())
        );
        Panel1Layout.setVerticalGroup(
            Panel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Panel1Layout.createSequentialGroup()
                .addGap(6, 6, 6)
                .addComponent(ClassCombo, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(StudentNumberInfo)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
                .addContainerGap())
        );

        Panel2.setBorder(javax.swing.BorderFactory.createTitledBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)), "Student Marks"));

        StudentMarksTable.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)));
        StudentMarksTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null}
            },
            new String [] {
                "SUBJECT", "INTERNAL", "EXTERNAL", "TOTAL", "RESULT"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false, false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        StudentMarksTable.setRowHeight(33);
        StudentMarksTable.setRowSelectionAllowed(false);
        jScrollPane2.setViewportView(StudentMarksTable);
        if (StudentMarksTable.getColumnModel().getColumnCount() > 0) {
            StudentMarksTable.getColumnModel().getColumn(4).setMinWidth(2);
        }

        jLabel1.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        jLabel1.setText("Name  :");

        NameLabel.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N

        jlabel2.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        jlabel2.setText("Total   :");

        TotalLabel.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N

        jLabel4.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N
        jLabel4.setText("Result :");

        ResultLabel.setFont(new java.awt.Font("Tahoma", 0, 14)); // NOI18N

        bSave.setText("Save");
        bSave.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                bSaveActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout Panel2Layout = new javax.swing.GroupLayout(Panel2);
        Panel2.setLayout(Panel2Layout);
        Panel2Layout.setHorizontalGroup(
            Panel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Panel2Layout.createSequentialGroup()
                .addGroup(Panel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(Panel2Layout.createSequentialGroup()
                        .addGap(30, 30, 30)
                        .addGroup(Panel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addGroup(Panel2Layout.createSequentialGroup()
                                .addComponent(jLabel4)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(ResultLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 273, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(Panel2Layout.createSequentialGroup()
                                .addComponent(jLabel1)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(NameLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 251, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 426, Short.MAX_VALUE)
                                .addComponent(bSave))
                            .addGroup(Panel2Layout.createSequentialGroup()
                                .addComponent(jlabel2)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(TotalLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 69, javax.swing.GroupLayout.PREFERRED_SIZE))))
                    .addGroup(Panel2Layout.createSequentialGroup()
                        .addContainerGap()
                        .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 717, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        Panel2Layout.setVerticalGroup(
            Panel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(Panel2Layout.createSequentialGroup()
                .addGroup(Panel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(Panel2Layout.createSequentialGroup()
                        .addGap(16, 16, 16)
                        .addComponent(jLabel1))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, Panel2Layout.createSequentialGroup()
                        .addContainerGap()
                        .addGroup(Panel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(NameLabel, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 19, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(bSave, javax.swing.GroupLayout.Alignment.TRAILING))))
                .addGroup(Panel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(Panel2Layout.createSequentialGroup()
                        .addGap(16, 16, 16)
                        .addComponent(TotalLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 19, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, Panel2Layout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jlabel2)))
                .addGap(18, 18, 18)
                .addGroup(Panel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(ResultLabel, javax.swing.GroupLayout.PREFERRED_SIZE, 17, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel4))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 298, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(Panel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(Panel2, javax.swing.GroupLayout.PREFERRED_SIZE, 749, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(Panel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(Panel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void ClassComboPropertyChange(java.beans.PropertyChangeEvent evt) {//GEN-FIRST:event_ClassComboPropertyChange

    }//GEN-LAST:event_ClassComboPropertyChange

    private void ClassComboActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_ClassComboActionPerformed
        ResultSet rs;
        int rowCount = 0;
        boolean set = false;
        firstTableModel.setRowCount(0);
        if (ClassCombo.getSelectedIndex() == 1) {
            set = true;
        }
        if ((rs = getDetails(ClassCombo.getSelectedItem().toString())) != null) {
            try {
                while (rs.next()) {
                    set = true;
                    String temp = rs.getString(4);
                    String ToBEInserted = "Oth";
                    if (temp.equalsIgnoreCase("FIRST CLASS WITH DISTINCTION ")) {
                        ToBEInserted = "FCD";
                    } else if (temp.equalsIgnoreCase("FIRST CLASS ")) {
                        ToBEInserted = "FC";
                    } else if (temp.equalsIgnoreCase("SECOND CLASS ")) {
                        ToBEInserted = "SC";
                    } else if (temp.equalsIgnoreCase("FAIL ")) {
                        ToBEInserted = "FAIL";
                    }

                    firstTableModel.insertRow(rowCount++, new Object[]{rowCount, rs.getString(2), rs.getString(1), rs.getString(3), ToBEInserted});

                }
            } catch (SQLException ex) {
                Logger.getLogger(DisplayForm.class.getName()).log(Level.SEVERE, null, ex);
            }
            StudDetails.setModel(firstTableModel);
            StudentNumberInfo.setText(StudDetails.getRowCount() + " Student Records found");
            StudDetails.getColumn("Rank").setPreferredWidth(50);
            StudDetails.getColumn("USN").setPreferredWidth(100);
            StudDetails.getColumn("Name").setPreferredWidth(150);
            StudDetails.getColumn("Total").setPreferredWidth(50);
            StudDetails.getColumn("Class").setPreferredWidth(50);
            StudDetails.setAutoCreateRowSorter(true);
            StudentNumberInfo.setText(StudDetails.getRowCount() + " Student Records found");
        }
        if (set) {
            fillMarksTable(StudDetails.getValueAt(0, 1).toString());
        } else {
            NameLabel.setText("");
            ResultLabel.setText("");
            TotalLabel.setText("");
            model.setRowCount(0);
            JOptionPane.showMessageDialog(null, "No " + ClassCombo.getSelectedItem().toString() + " Students found");
        }
    }//GEN-LAST:event_ClassComboActionPerformed

    private void ClassComboItemStateChanged(java.awt.event.ItemEvent evt) {//GEN-FIRST:event_ClassComboItemStateChanged
        // TODO add your handling code here:

    }//GEN-LAST:event_ClassComboItemStateChanged

    private void ClassComboMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_ClassComboMouseClicked
        // TODO add your handling code here:

    }//GEN-LAST:event_ClassComboMouseClicked

    private void StudDetailsMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_StudDetailsMouseClicked
        int selRow = StudDetails.getSelectedRow();
        String usn = (String) StudDetails.getValueAt(selRow, 1);
        fillMarksTable(usn);
    }//GEN-LAST:event_StudDetailsMouseClicked

    private void bSaveActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_bSaveActionPerformed
        Main.SaveTable saveTable = new Main.SaveTable(model);
    }//GEN-LAST:event_bSaveActionPerformed

    private void StudDetailsKeyPressed(java.awt.event.KeyEvent evt) {//GEN-FIRST:event_StudDetailsKeyPressed

    }//GEN-LAST:event_StudDetailsKeyPressed

    private void StudDetailsKeyReleased(java.awt.event.KeyEvent evt) {//GEN-FIRST:event_StudDetailsKeyReleased

        if (evt.getKeyCode() == KeyEvent.VK_DOWN || evt.getKeyCode() == KeyEvent.VK_UP) {
            int selRow = StudDetails.getSelectedRow();
            String usn = (String) StudDetails.getModel().getValueAt(selRow, 1).toString();
            fillMarksTable(usn);
        }
    }//GEN-LAST:event_StudDetailsKeyReleased

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;

                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(DisplayForm.class
                    .getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(DisplayForm.class
                    .getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(DisplayForm.class
                    .getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(DisplayForm.class
                    .getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new DisplayForm().setVisible(true);
            }
        });
    }

    public ResultSet getDetails(String StdClass) {
        Statement stmt = null;
        ResultSet rs = null;
        String query = "";
        //get USN from user

        System.out.println("after trim " + StdClass.trim());
        if (StdClass.equals("ALL")) {
            query = "select DISTINCT NAME,USN,TOTAL,MARKCLASS from RESULTTABLE ORDER BY TOTAL DESC";
        } else if (StdClass.equals("SOME")) {
            query = "select * from RESULTTABLE ";
        } else {
            query = "select DISTINCT NAME,USN,TOTAL,MARKCLASS from RESULTTABLE WHERE MARKCLASS = '" + StdClass.trim() + " ' ORDER BY TOTAL DESC";
        }

        try {
            stmt = con.createStatement();
            rs = stmt.executeQuery(query);

        } catch (SQLException ex) {
            System.out.println("Error : " + ex);
        }
        return rs;
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JComboBox ClassCombo;
    private javax.swing.JLabel NameLabel;
    private javax.swing.JPanel Panel1;
    private javax.swing.JPanel Panel2;
    private javax.swing.JLabel ResultLabel;
    private javax.swing.JTable StudDetails;
    private javax.swing.JTable StudentMarksTable;
    private javax.swing.JLabel StudentNumberInfo;
    private javax.swing.JLabel TotalLabel;
    private javax.swing.JButton bSave;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JLabel jlabel2;
    // End of variables declaration//GEN-END:variables

    private void fillMarksTable(String usn) {
        ResultSet res = null;
        String query = null;
        Statement stmt = null;
        model.setRowCount(0);
        StudentMarksTable.setModel(model);
        query = "select * from RESULTTABLE where USN='" + usn + "'";

        try {
            stmt = con.createStatement();
            res = stmt.executeQuery(query);
            res.next();
            int rowCount = 0;

            for (int row = 3; row < 35; row += 4) {

                model.insertRow(rowCount, new Object[]{MainForm.subNamesV.get(rowCount++), res.getInt(row), res.getInt(row + 1), res.getInt(row + 2), res.getString(row + 3)});
            }
            NameLabel.setText(res.getString(2));
            TotalLabel.setText(Integer.toString(res.getInt(35)));
            ResultLabel.setText(res.getString(36));

            StudentMarksTable.getColumn("SUBJECT").setPreferredWidth(300);

        } catch (SQLException ex) {
            System.out.println("Error : " + ex);
        }
    }

    public void retrieveSubjectNames() {
        MainForm.subNamesV.clear();
        Connection con = DBConnect.connection;
        ResultSet rs = null;
        String sql = "Select * From SUBJECTTABLE";
        try {
            Statement stmt = con.createStatement();
            rs = stmt.executeQuery(sql);

            while (rs.next()) {
                MainForm.subNamesV.add(rs.getString(1));
            }
        } catch (SQLException ex) {
            Logger.getLogger(resultFetch.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

}
