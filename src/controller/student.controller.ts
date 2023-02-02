import { Controller,Post,Put,Res,HttpStatus,Delete,Get,Body,Param} from '@nestjs/common';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { StudentService } from 'src/student/student.service';

@Controller('v1/student')
export class StudentController {
    constructor(private readonly studentService:StudentService){}
    
    @Post()
    async createStudent(@Res() response,@Body()createStudentDto:CreateStudentDto){
        try {
            const newStudent = await this.studentService.createStudent(createStudentDto)
            return response.status(HttpStatus.CREATED).json({
                messsage: "Estudante criado com sucesso",
                newStudent
            })
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode:400,
                message: "Erro ao criar um estudante",
                error: 'Bad Request'
            })
        }
    }

    @Get('v1/student/:id')
    async getStudents(@Res() response){
        try {
            const studentData = await this.studentService.getAllStudents()
            return response.status(HttpStatus.OK).json({
                message: "Alunos encontrados com sucesso!",
                studentData
            })
            
        } catch (err) {
            return response.status(err.status).json(err.response)
        }
    }

    @Put('v1/student/:id')
    async updateStudent(@Res() response,@Param('id') studentId:string,
    @Body() updateStudentDto: UpdateStudentDto){
        try {
            const existingStudent = await this.studentService.updateStudent(studentId,updateStudentDto)
            return response.status(HttpStatus.OK).json({
                message: "Alunos encontrados com sucesso!",
                existingStudent
            })
        } catch (err) {
            return response.status(err.status).json(err.response);    
        }
    }

    @Delete('v1/student/:id')
    async deleteStudent(@Res() response, @Param('id') studentId:string){
        try {
            const deletedStudent = await this.studentService.deleteStudent(studentId)
            return response.status(HttpStatus.OK).json({
                message:"Estudante deletado com sucesso",
                deletedStudent
            })
        } catch (err){
            return response.status(err.status).json(err.response);  
        }
    }
}
