package com.mohan.Employee_Management_System.repository;

import com.mohan.Employee_Management_System.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity,Long> {

}
