package com.example.login_auth_api.service;

import com.example.login_auth_api.domain.cliente.Cliente;
import com.example.login_auth_api.domain.endereco.Endereco;
import com.example.login_auth_api.dto.request.EnderecoRequestDTO;
import com.example.login_auth_api.dto.response.ClienteResponseDTO;
import com.example.login_auth_api.repositories.ClienteRepository;
import com.example.login_auth_api.repositories.EnderecoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final EnderecoRepository enderecoRepository;

    public List<ClienteResponseDTO> listarTodosClientes() {
        return clienteRepository.findAll()
                .stream()
                .map(ClienteResponseDTO::new)
                .toList();
    }

    public ClienteResponseDTO listarClientePorId(Integer id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));
        return new ClienteResponseDTO(cliente);
    }

    @Transactional
    public void adicionarEndereco(String email, EnderecoRequestDTO dto) {
        Cliente cliente = clienteRepository.findByDsEmailCliente(email)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));

        Endereco endereco = new Endereco();
        BeanUtils.copyProperties(dto, endereco);

        cliente.getEndereco().add(endereco);
        clienteRepository.save(cliente);
    }

    public List<Endereco> listarEnderecosDoCliente() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Cliente cliente = clienteRepository.findByDsEmailCliente(email)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));

        return cliente.getEndereco();
    }


    @Transactional
    public void atualizarEnderecoDoCliente(Integer idEndereco, EnderecoRequestDTO dto, String email) {
        Cliente cliente = clienteRepository.findByDsEmailCliente(email)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado"));

        Endereco endereco = enderecoRepository.findById(idEndereco)
                .orElseThrow(() -> new EntityNotFoundException("Endereço não encontrado"));

        if (!cliente.getEndereco().contains(endereco)) {
            throw new AccessDeniedException("Você não tem permissão para alterar este endereço");
        }

        endereco.setDsLogradouro(dto.dsLogradouro());
        endereco.setDsComplemento(dto.dsComplemento());
        endereco.setNmNumero(dto.nmNumero());
        endereco.setEndFavorito(dto.endFavorito());

        enderecoRepository.save(endereco);
    }
}