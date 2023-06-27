// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracking {
    enum RamStatus { ENSAMBLADO, PROGRAMADO, PROBADO, EMPACADO, ENVIADO, COMPLETO }

    struct Ram {
        address sender;
        address receptor;
        uint256 fechaCreacion;
        uint256 fechaEnvio;
        uint256 ddr;
        uint256 precio;
        RamStatus status;
        bool isPaid;
        uint256 fechaProgramado;
        uint256 fechaPrueba;
        uint256 fechaEmpaque;
        uint256 fechaFinal;
        // uint256 capacidad;
    }

    mapping(address => Ram[]) public rams;
    uint256 public ramCount;

     struct TypeRam {
        address sender;
        address receptor;
        uint256 fechaCreacion;
        uint256 fechaEnvio;
        uint256 ddr;
        uint256 precio;
        RamStatus status;
        bool isPaid;
        uint256 fechaProgramado;
        uint256 fechaPrueba;
        uint256 fechaEmpaque;
        uint256 fechaFinal;
        // uint256 capacidad;
    }

    TypeRam[] typeRams;
    
    event RamEnviada(address indexed sender, address indexed receptor, uint256 fechaEnvio);

    event RamAssembled(address indexed sender, address indexed receptor, uint256 fechaCreacion, uint256 ddr, uint256 precio);
    event RamProgrammed(address indexed sender, address indexed receptor, uint256 fechaProgramado);
    event RamTested(address indexed sender, address indexed receptor, uint256 fechaPrueba);
    event RamPacked(address indexed sender, address indexed receptor, uint256 fechaEmpaque);
    event RamDelivered(address indexed sender, address indexed receptor, uint256 fechaEnvio);
    event RamPaid(address indexed sender, address indexed receptor, uint256 amount, uint256 fechaFinal);

    constructor() {
        ramCount = 0;
    }

     function createRam(address _receptor, uint256 _fechaCreacion, uint256 _ddr, uint256 _precio) public payable {
        require(msg.value == _precio, "El monto del pago debe coincidir con el precio.");
        
        Ram memory ram = Ram(msg.sender, _receptor, _fechaCreacion, 0, _ddr, _precio, RamStatus.ENSAMBLADO, false,0,0,0,0);

        rams[msg.sender].push(ram);
        ramCount++;

         typeRams.push(
            TypeRam(
                msg.sender, 
                _receptor, 
                _fechaCreacion, 
                0, 
                _ddr, 
                _precio, 
                RamStatus.ENSAMBLADO, 
                false,
                0,
                0,
                0,
                0
            )
        );
        
        emit RamAssembled(msg.sender, _receptor, _fechaCreacion, _ddr, _precio);
    }

    function programmedRam(address _sender, address _receptor, uint256 _fechaProgramado, uint256 _index) public{
        Ram storage ram = rams[_sender][_index];
        TypeRam storage typeRam = typeRams[_index];

        require(ram.receptor == _receptor, "Receptor inexistente.");
        require(ram.status == RamStatus.PROGRAMADO, "RAM PROGRAMADA.");

        ram.status = RamStatus.PROGRAMADO;
        typeRam.status = RamStatus.PROGRAMADO;
        typeRam.fechaProgramado = block.timestamp;
        ram.fechaProgramado = block.timestamp;

        emit RamProgrammed(_sender, _receptor, _fechaProgramado);
    }

    function testRam(address _sender, address _receptor, uint256 _fechaPrueba, uint256 _index) public{
        Ram storage ram = rams[_sender][_index];
        TypeRam storage typeRam = typeRams[_index];

        require(ram.receptor == _receptor, "Receptor inexistente.");
        require(ram.status == RamStatus.PROBADO, "RAM PROGRAMADA.");

        ram.status = RamStatus.PROBADO;
        typeRam.status = RamStatus.PROBADO;
        typeRam.fechaPrueba = block.timestamp;
        ram.fechaPrueba = block.timestamp;

        emit RamTested(_sender, _receptor, _fechaPrueba);
    }

    function packedRam(address _sender, address _receptor, uint256 _fechaEmpaque, uint256 _index) public{
        Ram storage ram = rams[_sender][_index];
        TypeRam storage typeRam = typeRams[_index];

        require(ram.receptor == _receptor, "Receptor inexistente.");
        require(ram.status == RamStatus.EMPACADO, "RAM PROGRAMADA.");

        ram.status = RamStatus.EMPACADO;
        typeRam.status = RamStatus.EMPACADO;
        typeRam.fechaEmpaque = block.timestamp;
        ram.fechaEmpaque = block.timestamp;

        emit RamPacked(_sender, _receptor, _fechaEmpaque);
    }

    function startRam(address _sender, address _receptor, uint256 _index) public {
        Ram storage ram = rams[_sender][_index];
        TypeRam storage typeRam = typeRams[_index];
        
        require(ram.receptor == _receptor, "Receptor inexistente.");
        require(ram.status == RamStatus.ENSAMBLADO, "RAM enviada.");

        ram.status = RamStatus.ENVIADO;
        typeRam.status = RamStatus.ENVIADO;

        emit RamEnviada(_sender, _receptor, ram.fechaCreacion);
    }

    function completeRam(address _sender, address _receptor, uint256 _index, uint256 _fechaFinal) public {
        Ram storage ram = rams[_sender][_index];
        TypeRam storage typeRam = typeRams[_index];

        require(ram.receptor == _receptor, "Receptor inexistente.");
        require(ram.status == RamStatus.ENVIADO, "ram not in transit.");
        require(!ram.isPaid, "Ram proceso completado.");

         ram.status = RamStatus.COMPLETO;
         typeRam.status = RamStatus.COMPLETO;
         typeRam.fechaEnvio = block.timestamp;
         ram.fechaEnvio = block.timestamp;

        uint256 amount = ram.precio;

        payable(ram.sender).transfer(amount);

        ram.isPaid = true;
        typeRam.isPaid = true;

        emit RamDelivered(_sender, _receptor, ram.fechaEnvio);
        emit RamPaid(_sender, _receptor, amount, _fechaFinal);
    }

    function getRam(address _sender, uint256 _index) public view returns (address, address, uint256, uint256, uint256, uint256, RamStatus, bool) {
        Ram memory ram = rams[_sender][_index];
        return (ram.sender, ram.receptor, ram.fechaCreacion, ram.fechaEnvio, ram.ddr, ram.precio, ram.status, ram.isPaid);
    }

    function getRamsCount(address _sender) public view returns (uint256) {
        return rams[_sender].length;
    }

     function getAllTransactions()
        public
        view
        returns (TypeRam[] memory)
    
    {
        return typeRams;
    }

   
}
