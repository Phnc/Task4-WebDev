var app = new(function () {
  this.el = document.getElementById("employees");
  this.sortCPF = false;
  this.sortNome = false;
  this.sortCargo = false;


  this.employees = [{
      cpf: "123",
      nome: "Jose da Silva",
      cargo: "Professor",
      salario: 1000,
    },
    {
      cpf: "123",
      nome: "Jose da Silva",
      cargo: "Professor",
      salario: 1000,
    },
    {
      cpf: "123",
      nome: "Jose da Silva",
      cargo: "Professor",
      salario: 1000,
    },
    {
      cpf: "123",
      nome: "Jose da Silva",
      cargo: "Professor",
      salario: 1000,
    },
  ];

  this.Count = function (data) {
    var el = document.getElementById("counter");
    var name = "Funcionário";
    if (data) {
      if (data > 1) {
        name = "Funcionários";
      }
      el.innerHTML = data + " " + name;
    } else {
      el.innerHTML = "Sem " + name;
    }
  };

  this.fetchAll = function (sort) {
    var data = "";

    if (sort) {
      switch (true) {
        case (sort == 'CPF' && this.sortCPF === false):
          this.employees.sort((a, b) => (a.cpf > b.cpf) ? 1 : -1);
          this.sortCPF = !this.sortCPF;
          break;

        case (sort == 'Nome' && this.sortNome === false):
          this.employees.sort((a, b) => (a.nome > b.nome) ? 1 : -1);
          this.sortNome = !this.sortNome;
          break;

        case (sort == 'Cargo' && this.sortCargo === false):
          this.employees.sort((a, b) => (a.cargo > b.cargo) ? 1 : -1);
          this.sortCargo = !this.sortCargo;
          break;

        case (sort == 'CPF' && this.sortCPF === true):
          this.employees.sort((a, b) => (a.cpf < b.cpf) ? 1 : -1);
          this.sortCPF = !this.sortCPF;
          break;

        case (sort == 'Nome' && this.sortNome === true):
          this.employees.sort((a, b) => (a.nome < b.nome) ? 1 : -1);
          this.sortNome = !this.sortNome;
          break;

        case (sort == 'Cargo' && this.sortCargo === true):
          this.employees.sort((a, b) => (a.cargo < b.cargo) ? 1 : -1);
          this.sortCargo = !this.sortCargo;
          break;

        case (sort == 'Salario'):
          this.employees.sort((a, b) => (a.salario < b.salario) ? 1 : -1);
          break;

        default:
          console.log('Sort not yet implemented')
      }

    }

    if (this.employees.length > 0) {
      for (i = 0; i < this.employees.length; i++) {
        data += "<tr>";

        data += "<td>" + this.employees[i].cpf + "</td>";
        data += "<td>" + this.employees[i].nome + "</td>";
        data += "<td>" + this.employees[i].cargo + "</td>";
        data += "<td>" + this.employees[i].salario + "</td>";
        data += '<td><i class="fas fa-trash cursor colored_red" onclick="app.Delete(' + i + ')"></i></td>';
        data += "</tr>";
      }
    }
    document.getElementById('filtro-salario').value = '';
    this.Count(this.employees.length);
    return (this.el.innerHTML = data);
  };

  this.Add = function () {
    elCPF = document.getElementById("add-cpf");
    elNome = document.getElementById("add-nome");
    elCargo = document.getElementById("add-cargo");
    elSalario = document.getElementById("add-salario");

    vCPF = elCPF.value;
    vNome = elNome.value;
    vCargo = elCargo.value;
    vSalario = elSalario.value;

    if (vCPF && vNome && vCargo && vSalario) {

      if (this.employees.some(employee => employee.cpf === vCPF)) {
        alert('Não foi possível adicionar. Já existe um funcionário com este CPF');

      } else {

        obj = {
          cpf: vCPF,
          nome: vNome,
          cargo: vCargo,
          salario: vSalario,
        }

        this.employees.push(obj);

        elCPF.value = '';
        elNome.value = '';
        elCargo.value = '';
        elSalario.value = '';

        this.fetchAll();
      }


    } else {
      alert('Preencha todos os campos antes de adicionar um funcionário');
    }

  };

  this.Delete = function (item) {
    bool = confirm('Tem certeza de que deseja remover este funcionário?');

    if (bool) {
      this.employees.splice(item, 1);
      this.fetchAll();
    }

  }

  this.filterSalary = function () {
    el = document.getElementById('filtro-salario');
    value = el.value;

    data = '';
    count = 0;
    for (i = 0; i < this.employees.length; i++) {
      if (this.employees[i].salario > value) {
        data += "<tr>";
        data += "<td>" + this.employees[i].cpf + "</td>";
        data += "<td>" + this.employees[i].nome + "</td>";
        data += "<td>" + this.employees[i].cargo + "</td>";
        data += "<td>" + this.employees[i].salario + "</td>";
        data += '<td><i class="fas fa-trash cursor colored_red" onclick="app.Delete(' + i + ')"></i></td>';
        data += "</tr>";
        count++;
      }
    }

    this.Count(count);
    return (this.el.innerHTML = data);

  }

})();